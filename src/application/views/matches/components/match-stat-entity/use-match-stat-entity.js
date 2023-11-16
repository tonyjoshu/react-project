import { useAtomValue } from "jotai";
import { useState } from "react";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";

const useMatchStatEntity = (match_id) =>
{
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);

  const { config } = useAtomValue(adminTokenConfig)

  const [youtubeUrl, setYoutubeUrl] = useState("")
  const handleChange = (e) => setYoutubeUrl(e.target.value)

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => { setOpenModal(false); setYoutubeUrl("") }


  const [loading, setLoading] = useState(false)
  const handleUploadUrl = () =>
  {
    if (!youtubeUrl) return
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = youtubeUrl.match(regExp)
    if (match && match[2].length == 11)
    {
      setLoading(true)
      const _body = { highlights_url: youtubeUrl }
      apiCall({ url: `${ URLS.editMatch }/${ match_id }`, method: 'put', body: _body, tokenRequired: true, config: config })
        .then(resp => { })
        .finally(() => { setLoading(false) })
    } else
    {

      alert("please enter a valid url")
    }
    handleCloseModal()
  }

  return {
    selectedMenuItemIndex,
    setSelectedMenuItemIndex,
    openModal, handleOpenModal, handleCloseModal,
    youtubeUrl, handleChange,
    handleUploadUrl,
    loading
  };
};

export default useMatchStatEntity;
