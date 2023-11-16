export function FilePicker({_ref, handleFileSelect, selectedFile, name}) {
    return (
         <input hidden ref={_ref} type="file" onChange={handleFileSelect}/>
    )
}