const axios = require('axios');
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export default class MenuService{

    static getMenu(){
        return axios.get('http://localhost:5000/api/menu/get').then((result) => {
            
            //for now treat as array
            if(result.data.success){
                let comp = {}
                result.data.data.food.forEach((val, index) => {
                    comp[weekdays[index]] = val
                })
                return {
                    date: new Date(result.data.data.date),
                    food: comp
                }
                //but in the future 
                //return result.data.data
            }
        }).catch(err => console.log('MenuService Error:' + err))
        
    }

    static uploadMenu(menu_data){
        return axios.post('http://localhost:5000/api/menu/upload', menu_data).then((result) => {
            console.log(result)
            return result
        }).catch(err => console.log('MenuService Error:' + err))
    }
    
}