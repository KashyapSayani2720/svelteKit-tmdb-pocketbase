export async function filterMovies(genre: string, year:string, rating:string, user_id:string){
    try {
        let params = '';
        if (rating == 'Above 5'){
            params = `api_key=${
                import.meta.env.VITE_SECRET_API_KEY_V3
            }&vote_average.gte=5`
        }else if(rating == 'Below 5'){
            params = `api_key=${
                import.meta.env.VITE_SECRET_API_KEY_V3
            }&vote_average.lte=5`
        }else{
            params = `api_key=${
                import.meta.env.VITE_SECRET_API_KEY_V3
            }`
        }

        if (genre != '') {
            params += `&with_genres=${genre}`;
        }

        if (year != '') {
            params += `&year=${year}`;
        }

        const url = `${import.meta.env.VITE_SVELTEKIT_API_BASE_URL}api/movies`;

		const urlListMovieWithFilter = `${import.meta.env.VITE_SECRET_API_URL}/discover/movie?${params}`;

        const data = {
            user_id: user_id,
            url: urlListMovieWithFilter,
          };
      
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          };
          
        const resposeListMovieWithFilter = await fetch(url, options);

		const jsonListMovieWithGenre: {page: string, results: any } = await resposeListMovieWithFilter.json();
        
		return {
			movie_list_with_filter: jsonListMovieWithGenre
		};

	} catch (error) {
		console.log(error);
		throw new Error('error get list movie popular with genre');
	}
}