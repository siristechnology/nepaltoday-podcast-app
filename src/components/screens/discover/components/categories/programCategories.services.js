import { SERVER_URL } from 'react-native-dotenv';
export default class CategoriesService{
    static getProgramPodcast(program){
        return new Promise((resolve,reject)=>{
            fetch(`${SERVER_URL}/podcasts/program/${program}`,{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(res=>res.json()).then(info=>{
                resolve(info)
            }).catch(err=>reject(err))
        })
    }
}