import axios from "axios";

const instance = axios.create({
    baseURL: 'http://dry-forest-56016.herokuapp.com/',
})

export const fileApi = {
    getFile() {
        return instance.get('file', {responseType: 'blob'})
            .then( ({data}) => {
            const blob = new Blob([data], {type: 'image/jpeg'});
                console.log(window.URL.createObjectURL(blob))
            return window.URL.createObjectURL(blob)
        })
    },
    postFile(newFile: File){
        const formData = new FormData();
        formData.append('myFile', newFile, newFile.name);

        return instance.post('file', formData)
    }
}