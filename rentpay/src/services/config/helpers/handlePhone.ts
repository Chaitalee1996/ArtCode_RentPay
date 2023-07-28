import { Linking, Platform } from "react-native"


export const HandlePhone=(phone:any) => {
    console.log(phone)
   
        Platform.OS=='android'?
        Linking.openURL(`tel:+91 ${phone}`):
        Linking.openURL(`tel:${phone}`)
     
      
   
  }