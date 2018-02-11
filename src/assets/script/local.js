let local = {
	save (key, value) {
    	localStorage.setItem(key, JSON.stringify(value))
  	},
  	fetch (key) {
    	return JSON.parse(localStorage.getItem(key)) || {}
  	},
  	saveLen(key, value){
  		localStorage.setItem(key,value)
  	},
  	getLen(key){
    	return localStorage.getItem(key) || 7
  	}
}

export default local