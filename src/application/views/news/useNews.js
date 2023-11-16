import axios from "axios"
import { useEffect, useRef, useState } from "react"
import URLS from "src/config/urls/urls"
import apiCall from "src/helper_functions/api_call"
import { adminTokenConfig } from "src/config/jotai/atoms"
import { useAtomValue } from "jotai";



export default function useNews()
{
    const adminConfigValue = useAtomValue(adminTokenConfig)
    const { config } = adminConfigValue
    const imageRef = useRef(null)
    const [imageFile, setImageFile] = useState()
    const [imageFilePath, setImageFilePath] = useState()

    const youTubeLinkFieldRef = useRef(null)
    const [youtubeLink, setYoutubeLink] = useState("")
    const [youtubeLinkHolder, setYoutubeLinkHolder] = useState("")
    const [showYoutubeAddField, setShowYoutubeAddField] = useState(false)
    const handleShowYoutubeField = () => setShowYoutubeAddField(true)
    const handleHideYoutubeField = () =>
    {
        setShowYoutubeAddField(false)
        setYoutubeLink("")
    }
    const handleSetLink = () =>
    {
        if (youtubeLinkHolder === "") return
        setYoutubeLink(youtubeLinkHolder)
        setYoutubeLinkHolder("")
    }

    // fields to be submitted
    const [title, set_title] = useState("")
    const [description, set_description] = useState("")
    const [status, set_status] = useState(1)
    const [source, set_source] = useState("")
    const [source_url, set_source_url] = useState("")
    // this is for updating a news post
    const [thumbnail, setThumbnail] = useState("")

    const inputValuesData = [
        { label: "Post title", placeHolder: "title of the post", value: title, setter: set_title, textArea: false },
        { label: "Post Description", placeHolder: "Enter the description of the post", value: description, setter: set_description, textArea: true },
    ]

    const radioValuesData = [
       
    ]

    // for re-running the useeffect
    const [reRun, setRerun] = useState(0)

    const [publishing, setPublishing] = useState(false)

    const handlePublishPost = async () =>
    {
        if (!imageFile) return

        setPublishing(true)

        let formData = new FormData();
        formData.append("image", imageFile, imageFile.name)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("author", description)
        formData.append("category", "Sport news")
        formData.append("published_date", new Date())

        const { token } = adminConfigValue
        const response = await axios.post(URLS.createNewsPost, formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data`,
                'Authorization': `Bearer ${token}`
            }
        })
  
        setPublishing(false)
        setRerun(prev => prev + 1)
        handleCloseModal()
    }

    const [openModal, setOpenModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true)
    const handleOpenUpdateModal = () => setOpenUpdateModal(true)
    const handleCloseUpdateModal = () =>
    {
        setOpenUpdateModal(false)
        setImageFilePath()
        setImageFile()
        setShowYoutubeAddField(false)
        setYoutubeLink("")
        set_title("")
        set_description("")
        set_status(1)
        set_source("")
        set_source_url("")
    }

    const handleCloseModal = () =>
    {
        setOpenModal(false)
        setImageFilePath()
        setImageFile()
        setShowYoutubeAddField(false)
        setYoutubeLink("")
        set_title("")
        set_description("")
        set_status(1)
        set_source("")
        set_source_url("")
    }

    // news list
    const [news, setNews] = useState([])

    // loading
    const [newsLoading, setNewsLoading] = useState(false)

    const deleteNewsPost = async (slug) =>
    {
        setNewsLoading(true)
        const  token  = config.headers.Authorization
        const response = await fetch(`${ URLS.news }/delete/${ slug }`,{ 
            method: 'DELETE',
            headers:{
                'Authorization': token
            }
        })
        setRerun(prev => prev + 1)
        setNewsLoading(false)
    }

    const [updateLoading, setUpdateLoading] = useState(false)
    const [slug, setSlug] = useState("")
    const updateNewsPost = async (slug) =>
    {
        setSlug(slug)
        handleOpenUpdateModal()
        setUpdateLoading(true)
        const response = await apiCall({ url: `${ URLS.news }/${ slug }` })
        if (response.status === 200)
        {
            const dt = response.data
            set_title(dt.title)
            set_description(dt.description)
            set_status(dt.status_id)
            set_source(dt.source)
            set_source_url(dt.source_url)
            setThumbnail(dt.thumbnail)
        }
        setUpdateLoading(false)
    }

    const handleUpdateNewsPost = async () =>
    {
        setPublishing(true)

        let formData = new FormData();
        imageFile && formData.append("thumbnail", imageFile, imageFile.name)
        thumbnail && formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("status", status)
        formData.append("source_title", title)
        formData.append("source", source)
        formData.append("source_url", source_url)
        formData.append("posted_at", `${ new Date().getFullYear() }-${ new Date().getMonth() + 1 }-${ new Date().getDate() }`)

        const resp = await axios.post(`${ URLS.news }/${ slug }/edit`, formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data`
            }
        })

        handleCloseUpdateModal()
        setPublishing(false)
        setRerun(prev => prev + 1)
    }

    useEffect(() =>
    {
        const getNews = async () =>
        {
            setNewsLoading(true)
            const response = await apiCall({ url: `${ URLS.news }` })
            if (response.status !== 200) setNews(prev => { prev = []; return prev })
            else setNews(prev => { prev = response.data; return prev })
            setNewsLoading(false)
        }
        getNews()
    }, [reRun])

    return {
        openModal, handleOpenModal, handleCloseModal,
        imageRef, imageFile, setImageFile, imageFilePath, setImageFilePath,
        youtubeLink, setYoutubeLink,
        showYoutubeAddField, handleSetLink, handleShowYoutubeField, handleHideYoutubeField, youTubeLinkFieldRef, youtubeLinkHolder, setYoutubeLinkHolder,
        inputValuesData,
        status, set_status,
        radioValuesData,
        handlePublishPost, publishing,
        newsLoading, news, deleteNewsPost,
        thumbnail, updateNewsPost,
        openUpdateModal, handleOpenUpdateModal, handleCloseUpdateModal, updateLoading, handleUpdateNewsPost
    }
}