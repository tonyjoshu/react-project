import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { adminTokenConfig } from 'src/config/jotai/atoms'
import URLS from 'src/config/urls/urls'
import apiCall from 'src/helper_functions/api_call'
import getSeason from 'src/helper_functions/get_season'

export default function useAwards() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthtostring = month => new Date(`${ month }/01/2032`).toLocaleString('en-US', { month: 'long' })
    const [selectedMonth, setSelectedMonth] = useState(0)

    const [reRun, setReRun] = useState(0)
    const [awards, setAwards] = useState([])

    const { config } = useAtomValue(adminTokenConfig)
    const tabs = ["player of the month", "manager of the month"]
    const [modalOpen, setModalOpen] = useState(false)
    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)

    const [modalLoading, setModalLoading] = useState(false)

    const [player, setPlayer] = useState("")
    const [players, setPlayers] = useState([])

    const [manager, setManager] = useState("")
    const [managers, setManagers] = useState([])

    const [modalPlayerOpen, setModalPlayerOpen] = useState(false)
    const handlePlayerOpenModal = () => setModalPlayerOpen(true)
    const handlePlayerCloseModal = () => setModalPlayerOpen(false)

    const [modalManagerOpen, setModalManagerOpen] = useState(false)
    const handleManagerOpenModal = () => setModalManagerOpen(true)
    const handleManagerCloseModal = () => setModalManagerOpen(false)

    const addPlayerOfTheMonth = () => {
        handlePlayerOpenModal()
    }

    const confirmAddPlayerOfTheMonth = async () => {
        if (player === "") {
            toast.error("please select a player first")
            return
        }

        const seasonQuerry = getSeason(new Date())
        const body = {
            kind: "player",
            time: { year: parseInt(seasonQuerry.split("-")[0]), month: selectedMonth + 1 },
            season: seasonQuerry,
            player
        }

        setModalLoading(true)
        try {
            const resp = await apiCall({ url: URLS.addAward, method: 'post', tokenRequired: true, config, body })
            setModalLoading(false)
            handlePlayerCloseModal()
            setPlayer("")
            setSelectedMonth(0)
            setReRun(prev => prev + 1)
        } catch (error) {
            toast.error("something went wrong")
            console.log("error adding a player's award", error)
            setModalLoading(false)
        }
    }

    const addManagerOfTheMonth = () => {
        handleManagerOpenModal()
    }

    const [managerModalLoading, setManagerModalLoading] = useState(false)

    const confirmAddManagerOfTheMonth = async () => {
        if (manager === "") {
            toast.error("please select a manager first")
            return
        }

        const seasonQuerry = getSeason(new Date())
        const body = {
            kind: "manager",
            time: { year: parseInt(seasonQuerry.split("-")[0]), month: selectedMonth + 1 },
            season: seasonQuerry,
            manager: manager
        }
       
        setManagerModalLoading(true)
        try {
            const resp = await apiCall({ url: URLS.addAward, method: 'post', tokenRequired: true, config, body })
            setManagerModalLoading(false)
            handleManagerCloseModal()
            setManager("")
            setSelectedMonth(0)
            setReRun(prev => prev + 1)
        } catch (error) {
            toast.error("something went wrong")
            console.log("error adding a manager's award", error)
            setManagerModalLoading(false)
        }
    }

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const call = async () => {
            const _playersCall = apiCall({ url: URLS.players })
            const _awardsCall = apiCall({ url: URLS.getAwards })
            const _managersCall = apiCall({ url: URLS.managers })
            const promises = [_playersCall, _awardsCall, _managersCall]
            try {
                setLoading(true)
                const data = await Promise.allSettled(promises)

                const _players = data[0].value.data
                setPlayers(prev => { prev = _players; return prev })

                const _awards = data[1].value.data
                setAwards(_awards)
              // const _sortedAwards = _awards.sort((a, b) => b.date.month - a.date.month)
               //console.log(_sortedAwards,'sorted awards')
              // setAwards(prev => { prev = _sortedAwards; return prev })

                const _managers = data[2].value.data
                setManagers(prev => { prev = _managers; return prev })

                setLoading(false)
            } catch (error) {
                console.log("error getting awards", error)
                setLoading(false)
            }
        }

        call()
    }, [reRun])

    return {
        tabs,
        modalOpen,
        handleOpenModal,
        handleCloseModal,
        addPlayerOfTheMonth,
        addManagerOfTheMonth,
        modalPlayerOpen,
        handlePlayerCloseModal,
        modalManagerOpen,
        handleManagerCloseModal,
        player,
        setPlayer,
        modalLoading,
        players,
        confirmAddPlayerOfTheMonth,
        months,
        selectedMonth,
        setSelectedMonth,
        loading,
        awards,
        monthtostring,
        managers,
        manager,
        setManager,
        confirmAddManagerOfTheMonth,
        managerModalLoading
    }
}