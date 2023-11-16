import { Popover } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useState } from "react";
import { AiFillEye, AiOutlineCheck, AiOutlineMessage, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { MdClear, MdShowChart } from "react-icons/md";
import ReactPlayer from 'react-player/youtube';
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Column from "src/application/shared/components/Column";
import CustomImageSelector from "src/application/shared/components/image-select-custom";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Label from "src/application/shared/components/Label";
import ModalPopUp from "src/application/shared/components/ModalPopUp";
import Row from "src/application/shared/components/Row";
import styled from "styled-components";
import news_dummy from "./news_dummy";
import useNews from "./useNews";
import { BASEURL } from  "src/config/urls/urls"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import format from 'date-fns/format'

function News()
{
  const newsHook = useNews()
  const { news } = newsHook
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) =>
  {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () =>
  {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Column>
      <Row a_center j_between style={ { marginBottom: 40 } }>
        <Label xLarge xBold text={ "News" } color={ "grey" } />
        <ButtonStyled
          onClick={ newsHook.handleOpenModal }
          style={ { width: "fit-content", whiteSpace: "nowrap" } }
        >
          New post
        </ButtonStyled>
      </Row>

      {
        newsHook.newsLoading
          ? (
            <Label text={ "loading ..." } />
          )
          : (
            <Column>
              {
                newsHook.news.length === 0
                  ? (<Label text={ "No news availbale" } />)
                  : (
                    <>
                      { newsHook.news?.map((news, index) =>
                      {
                        return (
                          <Row
                            j_between
                            key={ news.id }
                            gap={ 10 }
                            style={{
                              backgroundColor: '#fff',
                              borderRadius: 8,
                              overflow: 'clip',
                              border: "1px solid #85F4FF",
                              padding: 5,
                              cursor: 'pointer'
                            }} >

                            <div style={ { width: 100, aspectRatio: 1, borderRadius: 8, overflow: 'clip' } }>
                              <img src={BASEURL+news.image_url} alt="" style={ { height: "100%", width: "100%", objectFit: 'cover' } } />
                            </div>

                            <Column a_start style={ { width: '100%', textOverflow: 'ellipsis', gap: 5 } }>
                              <Label xBold text={ news.title } />
                              <Row gap={ 5 } style={ { width: 'fit-content' } }>
                                { news.status_id === 1 ? <AiOutlineCheck /> : '' }
                                <Row a_center gap={ 5 } style={ { width: 'fit-content' } }>
                                  <Label noWrap small color={ "grey" } text={ `published on` } />
                                  <Label xBold noWrap small color={ "grey" } text={  format(new Date(news.createdAt),'dd/MMM/yyyy') } />
                                </Row>
                              </Row>
                            </Column>

                            {/* {
              [
                { icon: <MdShowChart />, value: "45,324", label: 'People reached', color: '#2BC155' },
                { icon: <MdShowChart style={ { transform: 'rotate(90deg)' } } />, value: "-2%", label: 'User insight', color: '#FD6162' },
                { icon: <AiOutlineMessage />, value: 56, label: 'Comments', color: '#828282' },
                { icon: <AiFillEye />, value: "412K", label: 'Engagements', color: '#7B61FF' },
              ].map((item, indexx) =>
              {
                return (
                  <Row a_center key={ indexx } gap={ 15 } style={ { width: 'fit-content', } } >
                    <div
                      style={ {
                        height: 40,
                        aspectRatio: 1,
                        backgroundColor: item.color,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        fontSize: 'x-large'
                      } }>
                      { item.icon }
                    </div>

                    <Column a_start style={ { width: 100 } }>
                      <Label xBold text={ item.value } />
                      <Label noWrap small text={ item.label } />
                    </Column>
                  </Row>
                )
              })
            } */}

                            <div
                              aria-describedby={ id }
                              style={ {
                                height: 50,
                                aspectRatio: 1,
                                backgroundColor: "#fff",
                                border: "1px solid #85F4FF",
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#212121",
                                cursor: "pointer",
                              } }
                              onClick={ handleClick }
                            >
                              <BsThreeDots />
                            </div>

                            <Popover
                              id={ id }
                              open={ open }
                              anchorEl={ anchorEl }
                              onClose={ handleClose }
                              anchorOrigin={ {
                                vertical: "bottom",
                                horizontal: "right",
                              } }
                              transformOrigin={ {
                                vertical: "top",
                                horizontal: "right",
                              } }
                              elevation={ 0 }>

                              <Column
                                style={ {
                                  width: 300,
                                  padding: 20,
                                  borderRadius: 10,
                                  border: "1px solid #85F4FF",
                                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                } }>
                                {
                                  [
                                    { label: "Edit", onClick: () => newsHook.updateNewsPost(news._id) },
                                    { label: "Delete", onClick: () => newsHook.deleteNewsPost(news._id) },
                                  ].map((option, indexxx) => (
                                    <DotsMenus
                                      key={ indexxx }
                                      onClick={ () =>
                                      {
                                        option.onClick();
                                        handleClose();
                                      } }
                                    >
                                      <Label noWrap bold text={ `${ option.label } news post` } />
                                    </DotsMenus>
                                  ))
                                }
                              </Column>
                            </Popover>



                          </Row>
                        )
                      }) }
                    </>
                  )
              }

              <ModalPopUp
                open={ newsHook.openModal }
                handleClose={ newsHook.handleCloseModal }
                children={
                  <>
                    <Label a_s_left xBold xLarge color={ "grey" } text={ "New post" } />
                    <div style={ { height: 1, width: "100%", backgroundColor: '#85F4FF' } } />

                    {
                      newsHook.inputValuesData?.map((data, index) =>
                      {
                        if (data.textArea)
                        {
                          return (
                            <Column key={ index } style={ { gap: 5 } }>
                              <Label xBold a_s_left text={ data.label } />

                              <TextareaAutosize
                                aria-label="minimum height"
                                minRows={ 3 }
                                value={ data.value }
                                onChange={ (e => data.setter(e.target.value)) }
                                placeholder={ data.placeHolder }
                                style={ {
                                  width: "100%",
                                  border: "1px solid #85F4FF",
                                  borderRadius: 10,
                                  padding: 10,
                                  outline: 'none'
                                } }
                              />
                            </Column>
                          )
                        }

                        return (
                          <Column key={ index } style={ { gap: 5 } } >
                            <Label xBold a_s_left text={ data.label } />
                            <InputFieldCustom
                              value={ data.value }
                              setter={ data.setter }
                              placeholder={ data.placeHolder }
                            />
                          </Column>
                        )
                      })
                    }

                    <FormControl style={ { alignSelf: 'flex-start' } } >
                      <Label xBold a_s_left text={ "Status" } />
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={ newsHook.status }
                        onChange={ (_, newIndex) => newsHook.set_status(newIndex) }
                        name="radio-buttons-group"
                      >
                        { newsHook.radioValuesData.map((radio, index) => (
                          <FormControlLabel key={ index } value={ radio.value } control={ <Radio /> } label={ radio.label } />
                        )) }

                      </RadioGroup>
                    </FormControl>

                    <Column a_start>
                      <Label xBold a_s_left text={ "Media" } />

                      <Row gap={ 10 }>
                        <CustomImageSelector
                          noHelper
                          buttonLabel={ "Add Photo" }
                          picInputRef={ newsHook.imageRef }
                          image={ newsHook.imageFilePath }
                          setter={ newsHook.setImageFilePath }
                          imageFileSetter={ newsHook.setImageFile }
                        />
                      </Row>
                    </Column>

                    {/* {
                    newsHook.showYoutubeAddField
                    &&
                    (
                      <Row gap={ 10 }>
                        <InputFieldCustom
                          value={ newsHook.youtubeLinkHolder }
                          setter={ newsHook.setYoutubeLinkHolder }
                          placeholder={ "Enter a valid youtube url" }
                        />
                        <ButtonStyled
                          style={ {
                            width: "fit-content",
                            backgroundColor: "white",
                            border: `1px solid ${ "#85F4FF" }`,
                            color: "#212121",
                            whiteSpace: 'nowrap',
                            paddingBlock: 0,
                            paddingBlock: 10
                          } }
                          onClick={ newsHook.handleSetLink }
                        >Set Link</ButtonStyled>

                        <div
                          style={ {
                            height: 40,
                            aspectRatio: 1,
                            borderRadius: "50%",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: "1px solid #85F4FF",
                            cursor: 'pointer',
                            backgroundColor: '#2BC155',
                            color: '#fff'
                          } }
                          onClick={ newsHook.handleHideYoutubeField }
                        >
                          <MdClear />
                        </div>
                      </Row>
                    )
                  }

                  {
                    newsHook.youtubeLink &&
                    <div style={ { width: "100%", height: 500, borderRadius: 10, } }>
                      <ReactPlayer controls={ true } url={ newsHook.youtubeLink } height={ "300px" } width={ "100%" } />
                    </div>
                  } */}

                    {/* <ButtonStyled
                    style={ {
                      width: "100%",
                      backgroundColor: "whitesmoke",
                      border: `1px solid ${ "#85F4FF" }`,
                      color: "#212121",
                      display: newsHook.showYoutubeAddField ? 'none' : ''
                    } }
                    onClick={ newsHook.handleShowYoutubeField }
                  >
                    <Row j_center a_center gap={ 10 }>
                      <AiOutlineVideoCameraAdd style={ { fontSize: "large" } } />
                      <Label noWrap text={ "Add video" } />
                    </Row>
                  </ButtonStyled> */}


                    <ButtonStyled
                      onClick={ newsHook.handlePublishPost }
                      style={ { alignSelf: 'flex-end', width: 'fit-content', paddingInline: 50, marginTop: 20 } }>
                      <Row a_center j_center gap={ 10 }>
                        <FiSend style={ { fontSize: "large" } } />
                        <Label noWrap text={ newsHook.publishing ? "Publishing ..." : "Publish" } />
                      </Row>
                    </ButtonStyled>
                  </>
                }
              />

              <ModalPopUp
                open={ newsHook.openUpdateModal }
                handleClose={ newsHook.handleCloseUpdateModal }
                children={
                  <>
                    {
                      newsHook.updateLoading
                        ? "fetching the news post ..."
                        : (
                          <>
                            <Label a_s_left xBold xLarge color={ "grey" } text={ "Updating a post" } />
                            <div style={ { height: 1, width: "100%", backgroundColor: '#85F4FF' } } />

                            {
                              newsHook.inputValuesData?.map((data, index) =>
                              {
                                if (data.textArea)
                                {
                                  return (
                                    <Column key={ index } style={ { gap: 5 } }>
                                      <Label xBold a_s_left text={ data.label } />

                                      <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={ 3 }
                                        value={ data.value }
                                        onChange={ (e => data.setter(e.target.value)) }
                                        placeholder={ data.placeHolder }
                                        style={ {
                                          width: "100%",
                                          border: "1px solid #85F4FF",
                                          borderRadius: 10,
                                          padding: 10,
                                          outline: 'none'
                                        } }
                                      />
                                    </Column>
                                  )
                                }

                                return (
                                  <Column key={ index } style={ { gap: 5 } } >
                                    <Label xBold a_s_left text={ data.label } />
                                    <InputFieldCustom
                                      value={ data.value }
                                      setter={ data.setter }
                                      placeholder={ data.placeHolder }
                                    />
                                  </Column>
                                )
                              })
                            }

                            <FormControl style={ { alignSelf: 'flex-start' } } >
                              <Label xBold a_s_left text={ "Status" } />
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={ newsHook.status }
                                onChange={ (_, newIndex) => newsHook.set_status(newIndex) }
                                name="radio-buttons-group"
                              >
                                { newsHook.radioValuesData.map((radio, index) => (
                                  <FormControlLabel key={ index } value={ radio.value } control={ <Radio /> } label={ radio.label } />
                                )) }

                              </RadioGroup>
                            </FormControl>

                            <Column a_start>
                              <Label xBold a_s_left text={ "Media" } />

                              <Label small a_s_center text={ "Current thumbnail" } />
                              <img src={ newsHook.thumbnail } alt="" style={ { height: 120, aspectRatio: 1, objectFit: 'cover', borderRadius: 8, alignSelf: 'center' } } />

                              <Row gap={ 10 }>
                                <CustomImageSelector
                                  noHelper
                                  buttonLabel={ "Change thumbnail Photo" }
                                  picInputRef={ newsHook.imageRef }
                                  image={ newsHook.imageFilePath }
                                  setter={ newsHook.setImageFilePath }
                                  imageFileSetter={ newsHook.setImageFile }
                                />
                              </Row>
                            </Column>

                            {/* {
                        newsHook.showYoutubeAddField
                        &&
                        (
                          <Row gap={ 10 }>
                            <InputFieldCustom
                              value={ newsHook.youtubeLinkHolder }
                              setter={ newsHook.setYoutubeLinkHolder }
                              placeholder={ "Enter a valid youtube url" }
                            />
                            <ButtonStyled
                              style={ {
                                width: "fit-content",
                                backgroundColor: "white",
                                border: `1px solid ${ "#85F4FF" }`,
                                color: "#212121",
                                whiteSpace: 'nowrap',
                                paddingBlock: 0,
                                paddingBlock: 10
                              } }
                              onClick={ newsHook.handleSetLink }
                            >Set Link</ButtonStyled>
    
                            <div
                              style={ {
                                height: 40,
                                aspectRatio: 1,
                                borderRadius: "50%",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: "1px solid #85F4FF",
                                cursor: 'pointer',
                                backgroundColor: '#2BC155',
                                color: '#fff'
                              } }
                              onClick={ newsHook.handleHideYoutubeField }
                            >
                              <MdClear />
                            </div>
                          </Row>
                        )
                      }
    
                      {
                        newsHook.youtubeLink &&
                        <div style={ { width: "100%", height: 500, borderRadius: 10, } }>
                          <ReactPlayer controls={ true } url={ newsHook.youtubeLink } height={ "300px" } width={ "100%" } />
                        </div>
                      } */}

                            {/* <ButtonStyled
                        style={ {
                          width: "100%",
                          backgroundColor: "whitesmoke",
                          border: `1px solid ${ "#85F4FF" }`,
                          color: "#212121",
                          display: newsHook.showYoutubeAddField ? 'none' : ''
                        } }
                        onClick={ newsHook.handleShowYoutubeField }
                      >
                        <Row j_center a_center gap={ 10 }>
                          <AiOutlineVideoCameraAdd style={ { fontSize: "large" } } />
                          <Label noWrap text={ "Add video" } />
                        </Row>
                      </ButtonStyled> */}


                            <ButtonStyled
                              onClick={ newsHook.handleUpdateNewsPost }
                              style={ { alignSelf: 'flex-end', width: 'fit-content', paddingInline: 50, marginTop: 20 } }>
                              <Row a_center j_center gap={ 10 }>
                                <FiSend style={ { fontSize: "large" } } />
                                <Label noWrap text={ newsHook.publishing ? "updating post ..." : "Update news post" } />
                              </Row>
                            </ButtonStyled>
                          </>
                        )
                    }
                  </>

                }
              />

            </Column>
          )
      }



    </Column>
  )
}

export default News;

const DotsMenus = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  transition: 0.3s;

  &:hover {
    /* background-color: #85f4ff; */
    background-color: #e2e6ee;
  }
`;