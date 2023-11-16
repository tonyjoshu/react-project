import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Column from "src/application/shared/components/Column";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Label from "src/application/shared/components/Label";
import MaterialSelect from "src/application/shared/components/material-select";
import Row from "src/application/shared/components/Row";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import getSeason from "src/helper_functions/get_season";

export default function Settings() {
  const settingsHook = useSettings();

  if (settingsHook.loading) {
    return (
      <Column a_center j_center style={{ padding: 50 }}>
        <Label text={"loading ..."} />
      </Column>
    );
  }

  return (
    <Row a_start gap={20}>
      <Column
        style={{
          width: "40%",
        }}
      >
        <Label a_s_left xBold color={"grey"} xLarge text={"Settings"} />
        <Column a_start style={{ paddingBlock: 15 }}>
          {settingsHook.menuOptions.map((label, index) => {
            return (
              <div
                key={index}
                onClick={() => settingsHook.setSelectedOption(index)}
                style={{
                  backgroundColor:
                    index === settingsHook.selectedMenuOption ? "white" : "",
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                <Label a_s_left text={label} />
              </div>
            );
          })}
        </Column>
      </Column>
      <Column a_start style={{}}>
        {((list, label) => {
          switch (label) {
            case list[0]:
              return (
                <SeasonSetting
                  selectedSeason={settingsHook.selectedSeason}
                  round={settingsHook.round}
                  setRound={settingsHook.setRound}
                  handleConfirmSetRounds={settingsHook.handleConfirmSetRounds}
                  loading={settingsHook.loading}
                  roundCountChanged={settingsHook.roundCountChanged}
                  roundsFromApi={settingsHook.roundsFromApi}
                />
              );

            default:
              return "";
          }
        })(
          settingsHook.menuOptions,
          settingsHook.menuOptions[settingsHook.selectedMenuOption]
        )}
      </Column>
    </Row>
  );
}

const useSettings = () => {
  const menuOptions = ["Seasons"];
  const [selectedMenuOption, setSelectedOption] = useState(0);

  const selectedSeason = getSeason(new Date());

  const [round, setRound] = useState(0);
  const [roundFromApi, setRoundFromApi] = useState();

  const [loading, setLoading] = useState(false);

  const { config: _config } = useAtomValue(adminTokenConfig);

  const [roundCountChanged, setRoundCountChanged] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiCall({ url: `${URLS.roundsBySeason}/${getSeason(new Date())}` })
      .then((res) => {
        try {
          setRoundFromApi(res.data);
          setRound((prev) => {
            prev = res.data.length;
            return prev;
          });
        } catch (error) {
          setRound(0);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleConfirmSetRounds = () => {
    if (round < 10) return;

    if (roundFromApi) {
      if (roundFromApi.length > round) {
        setLoading(true);

        let excessRounds = roundFromApi.length - round;
        console.log("excessRounds", excessRounds);
        let ids = [];
        for (let index = 0; index < excessRounds; index++) {
          let x = parseInt(index) + parseInt(round) + 1;
          let id = roundFromApi.find((rnd) => parseInt(rnd.num) === x)._id;
          ids.push(id);
        }

        console.log("_config", _config);

        let promises = ids.map((id) => {
          return apiCall({
            url: `${URLS.rounds}/delete/${id}`,
            method: "delete",
            tokenRequired: true,
            config: _config,
          });
        });

        Promise.allSettled(promises)
          .then((result) => {})
          .finally(() => {
            setLoading(false);
            window.location.reload();
          });
      }
      if (roundFromApi.length < round) {
        setLoading(true);
        let promises = [];
        for (let index = 1; index <= round - roundFromApi.length; index++) {
          promises.push(
            apiCall({
              url: URLS.roundAdd,
              method: "post",
              tokenRequired: true,
              config: _config,
              body: {
                season: selectedSeason,
                num: index + roundFromApi.length,
              },
            })
          );
        }

        Promise.allSettled(promises)
          .then((result) => {})
          .finally(() => {
            setLoading(false);
            window.location.reload();
          });
      }
      return;
    } else {
      setLoading(true);
      let promises = [];
      for (let index = 1; index <= round; index++) {
        promises.push(
          apiCall({
            url: URLS.roundAdd,
            method: "post",
            tokenRequired: true,
            config: _config,
            body: {
              season: selectedSeason,
              num: index,
            },
          })
        );
      }

      Promise.allSettled(promises)
        .then((result) => {})
        .finally(() => {
          setLoading(false);
          window.location.reload();
        });
    }
  };

  return {
    menuOptions,
    selectedMenuOption,
    setSelectedOption,
    selectedSeason,
    round,
    setRound,
    handleConfirmSetRounds,
    loading,
    roundCountChanged,
    setRoundCountChanged,
    roundsFromApi: roundFromApi?.length ?? undefined,
  };
};

const SeasonSetting = ({
  selectedSeason,
  round,
  setRound,
  handleConfirmSetRounds,
  loading,
  roundsFromApi,
}) => {
  const msg1 = `Here you can change the number of rounds in season ${selectedSeason}.`;
  const msg2 = `Once you change the round count field, the appropriate buttons will appear.`;
  return (
    <Column
      a_start
      style={{
        marginTop: 0,
        backgroundColor: "white",
        minHeight: "80vh",
        padding: 20,
      }}
    >
      <Label large xBold color={"grey"} a_s_left text={"Rounds in a season"} />
      <Column style={{ gap: 0, marginLeft: 15 }}>
        <Label small a_s_left text={msg1} />
        <Label small a_s_left text={msg2} />
      </Column>
      <Row gap={10}>
        <InputFieldCustom label={"Season"} value={selectedSeason} disabled />

        <InputFieldCustom
          type={"number"}
          min={0}
          label={"Rounds count"}
          value={round}
          setter={setRound}
          placeholder={`Rounds in the ${selectedSeason} season`}
        />
      </Row>
      {Boolean(
        roundsFromApi !== parseInt(round) || roundsFromApi === undefined
      ) ? (
        <Row gap={10}>
          <ButtonStyled
            onClick={() => {
              setRound(roundsFromApi);
            }}
            disabled={loading}
            style={{ backgroundColor: "tomato" }}
          >
            {loading ? "loading ..." : `Revert back`}
          </ButtonStyled>

          <ButtonStyled onClick={handleConfirmSetRounds} disabled={loading}>
            {loading
              ? "loading ..."
              : `Confirm season ${selectedSeason} has ${round} rounds`}
          </ButtonStyled>
        </Row>
      ) : (
        ""
      )}
    </Column>
  );
};
