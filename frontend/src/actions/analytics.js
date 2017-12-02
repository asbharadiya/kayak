import * as api from '../api/analytics';


export function trackClick(payload) {
	return function(dispatch) {
	    return api.trackClick(payload).then(response => {
        if(response.status === 200) {
          alert("success");
        } else {
          alert("failed");
        }
      }).catch(error => {
         alert("caught alert");
      })
	};
}
