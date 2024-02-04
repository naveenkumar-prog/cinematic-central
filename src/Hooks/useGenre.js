const useGenre = (selectedGenres) => {
    if(selectedGenres.length < 1){
        return ""
    }
    const GenresIds = selectedGenres.map((g)=>g.id)
    return(
        GenresIds.reduce((acc,curr)=>acc+','+curr)
    )
}

export default useGenre