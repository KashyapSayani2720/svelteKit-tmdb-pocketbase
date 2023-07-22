export async function filterMovies(genre: string, year:string, rating:string){
    try {
        let params = '';
        if (rating == 'Above 5'){
            params = `api_key=${
                import.meta.env.VITE_SECRET_API_KEY_V3
            }&vote_average.gte=5&with_genres=${genre}`
        }else if(rating == 'Below 5'){
            params = `api_key=${
                import.meta.env.VITE_SECRET_API_KEY_V3
            }&vote_average.lte=5&with_genres=${genre}`
        }else{
            params = `api_key=${
                import.meta.env.VITE_SECRET_API_KEY_V3
            }&with_genres=${genre}`
        }

        if (year != '') {
            params += `&year=${year}`;
        }

		const urlListMovieWithFilter= `${import.meta.env.VITE_SECRET_API_URL}/discover/movie?${params}`;

		const resposeListMovieWithFilter = await fetch(urlListMovieWithFilter);

		const jsonListMovieWithGenre: {page: string, results: any } = await resposeListMovieWithFilter.json();
        console.log("jsonListMovieWithGenre", urlListMovieWithFilter, jsonListMovieWithGenre.results.length);
        
		return {
			movie_list_with_filter: jsonListMovieWithGenre.results,
		};
	} catch (error) {
		console.log(error);
		throw new Error('error get list movie popular with genre');
	}
}