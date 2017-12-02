import * as api from '../api/analytics';


export function trackClick(payload) {
	return function(dispatch) {
	    return api.trackClick(payload).then(response => {}).catch(error => {
         console.log('tracking failed');
      })
	};
}
