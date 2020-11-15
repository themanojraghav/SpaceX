function loadData (event, filter) {
    let spaceX;
    const params = new URLSearchParams(location.search);
    if (event) {
        params.set(filter, event.target.value);
    }

    window.history.replaceState({}, '', `${location.pathname}?${params}`);
    const launchYear = params.get('launch_year') || '';
    const launchSuccess = params.get('launch_success') || '';
    const landSuccess = params.get('land_success') || '';
    axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launchSuccess}&land_success=${landSuccess}&launch_year=${launchYear}`)
    .then(function (response) {
        const data = response.data;
        spaceX = data.map((cardData) => {
            return `<div class="card">
                <div class="card-inner">
                <div class="img-block">
                    <img src="${cardData.links.mission_patch_small}">
                </div>
            <div class="card-head">${cardData.mission_name}</div>
            <div class="card-body">
                <div class="data-row miss-id">
                    <span class="head">Mission ids:</span>
                    <ul>
                        <li>${cardData.mission_id.map((mission) => mission)}</li>
                    </ul>
                </div>
                <div class="data-row">
                    <span class="head">Launch Year:</span>
                    <span>${cardData.launch_year}</span>
                </div>
                <div class="data-row">
                    <span class="head">Successfull Launch:</span>
                    <span>${cardData.launch_success}</span>
                </div>
                <div class="data-row">
                    <span class="head">Successfull Landing:</span>
                    <span>${cardData.rocket.first_stage.cores[0].land_success || ''}</span>
                </div>
            </div>
            </div>
        </div>`
        })

        // handle success
        document.getElementById('cards').innerHTML = spaceX.join('') || `<div>No data Found</div>`;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })


    
}