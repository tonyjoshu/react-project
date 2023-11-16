import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'
import ButtonStyled from 'src/application/shared/components/ButtonStyled'
import InputFieldCustom from 'src/application/shared/components/input-field-cutom'
import Label from 'src/application/shared/components/Label'
import MaterialSelect from 'src/application/shared/components/material-select'
import ModalPopUp from 'src/application/shared/components/ModalPopUp'
import Row from 'src/application/shared/components/Row'
import getSeason from 'src/helper_functions/get_season'
import AwardCard from './components/AwardCard'
import ScrollableTabs from './components/ScrollableTabs'
import useAwards from './hook'
import format from 'date-fns/format'

function Awards() {
    const hook = useAwards()
    const [value, setValue] = React.useState(0);
    const placeholderImage = 'https://1vs1-7f65.kxcdn.com/img/player-placeholder-small.svg'

    if (hook.loading) {
        return <p>loading ...</p>
    }
    //console.log(hook.awards)

    return (
        <div className='w-full'>
            <ScrollableTabs itemsList={ hook.tabs } value={ value } setValue={ setValue } />
            { ((index) => {
                switch (index) {
                    case 0:
                        return (
                            <div className=' w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mt-4'>
                                <AwardCard data={
                                    {
                                        toForm: true,
                                        type: 'player',
                                        image: placeholderImage,
                                        season: getSeason(new Date()),
                                    }
                                } addEntry={ true } onClick={hook.addPlayerOfTheMonth} />
                                {
                                    //hook.awards.filter(award => award.kind === "player").sort((a, b) => b.date.month - a.date.month).map((award, index) => {
                                        hook.awards.filter(award => award.kind === "player").map((award, index) => {
                                        const _player = hook.players.find(player => player._id === award.player) ?? {}
                                        const info = {
                                            type: award.kind,
                                            name: award.player.name ?? "n/a",
                                            image: award.player.pic ?? placeholderImage,
                                              //image: _player?.pic ?? placeholderImage,
                                            month: hook.monthtostring(award.time === undefined ? "n/a" : award.time.month),
                                           // month:format(new Date(award.time.month),'MMMM'),
                                            season: award.season,
                                            team: {
                                                name:award.player.current_club.name,// _player.current_club.name,
                                                logo:award.player.current_club.pic// _player.current_club.logo,
                                            }
                                        }
                                        return (
                                            <AwardCard key={ index } data={ info } />
                                        )
                                    })
                                }
                            </div>
                        )

                    case 1:
                        return (
                            <div className=' w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mt-4'>
                                <AwardCard
                                    data={ {
                                        toForm: true,
                                        type: 'manager',
                                        image: placeholderImage,
                                        season: getSeason(new Date()),
                                    } }
                                    addEntry={ true }
                                    onClick={ hook.addManagerOfTheMonth }
                                />
                                {
                                    hook.awards.filter(award => award.kind === "manager").map((award, index) => {
                                        //hook.awards.filter(award => award.kind === "manager").sort((a, b) => b.time.month - a.time.month).map((award, index) => {
                                        const _manager = hook.managers.find(manager => manager._id === award.coach) ?? {}
                                        const info = {
                                            type: award.kind,
                                            name: award.manager.name ?? "n/a",
                                            image: award.manager.pic ?? "https://1vs1-7f65.kxcdn.com/img/player-placeholder-small.svg",
                                            month: hook.monthtostring(award.time === undefined ?  "n/a" : award.time.month),
                                           // month:format(new Date(award.time.month),'MMMM'),
                                            season: award.season,
                                            team: {
                                                name:award.manager.current_club.name,
                                                logo:award.manager.current_club.logo,
                                            }
                                        }
                                        return (
                                            <AwardCard key={ index } data={ info } />
                                        )
                                    })
                                }
                            </div>
                        )

                    default:
                        break
                }
            })(value) }

            <ModalPopUp
                open={ hook.modalPlayerOpen }
                handleClose={ hook.handlePlayerCloseModal }
                height={ "fit-content" }
                children={
                    <>
                        {
                            hook.modalLoading
                                ? (
                                    <>
                                        <p>loading ...</p>
                                    </>
                                )
                                : (
                                    <>
                                        <p>player of the month award</p>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <Label a_s_left marginLeft={ 10 } small text={ "Player" } />
                                            <MaterialSelect
                                                value={ hook.player }
                                                setter={ hook.setPlayer }
                                                options={ ((players) => {
                                                    return players?.map((player) => {
                                                        return {
                                                            label: player?.name,
                                                            value: player?._id
                                                        }
                                                    })
                                                })(hook.players) } />
                                        </div>

                                        <div className='flex flex-col gap-1 w-full'>
                                            <Label a_s_left marginLeft={ 10 } small text={ "Month" } />
                                            <MaterialSelect
                                                value={ hook.selectedMonth }
                                                setter={ hook.setSelectedMonth }
                                                options={ ((months) => {
                                                    return months?.map((month, index) => {
                                                        return {
                                                            label: month,
                                                            value: index
                                                        }
                                                    })
                                                })(hook.months) } />
                                        </div>
                                        <ButtonStyled onClick={ hook.confirmAddPlayerOfTheMonth }>
                                            <Row a_center j_center gap={ 10 }>
                                                <Label text={ "Confirm adding player" } />
                                                <FiArrowRight />
                                            </Row>
                                        </ButtonStyled>
                                    </>
                                )
                        }

                    </>
                }
            />

            <ModalPopUp
                open={ hook.modalManagerOpen }
                handleClose={ hook.handleManagerCloseModal }
                height={ "fit-content" }
                children={
                    <>
                        {
                            hook.managerModalLoading
                                ? (
                                    <>
                                        <p>loading ...</p>
                                    </>
                                )
                                : (
                                    <>
                                        <p>manager of the month award</p>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <Label a_s_left marginLeft={ 10 } small text={ "Manager" } />
                                            <MaterialSelect
                                                value={ hook.manager }
                                                setter={ hook.setManager }
                                                options={ ((managers) => {
                                                    return managers?.map((manager) => {
                                                        return {
                                                            label: manager?.name,
                                                            value: manager?._id
                                                        }
                                                    })
                                                })(hook.managers) } />
                                        </div>

                                        <div className='flex flex-col gap-1 w-full'>
                                            <Label a_s_left marginLeft={ 10 } small text={ "Month" } />
                                            <MaterialSelect
                                                value={ hook.selectedMonth }
                                                setter={ hook.setSelectedMonth }
                                                options={ ((months) => {
                                                    return months?.map((month, index) => {
                                                        return {
                                                            label: month,
                                                            value: index
                                                        }
                                                    })
                                                })(hook.months) } />
                                        </div>
                                        <ButtonStyled onClick={ hook.confirmAddManagerOfTheMonth }>
                                            <Row a_center j_center gap={ 10 }>
                                                <Label text={ "Confirm adding manager of the month" } />
                                                <FiArrowRight />
                                            </Row>
                                        </ButtonStyled>
                                    </>
                                )
                        }

                    </>
                }
            />
        </div>
    )
}

export default Awards