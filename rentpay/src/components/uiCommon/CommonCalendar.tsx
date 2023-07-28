import { View, Text } from 'react-native'
import React from 'react'
import DatePicker from "react-native-modal-datetime-picker";

type Props = {
    value:any,
    displayDate:any,
    isVisible:boolean,
    onCancel:(visible:boolean)=>void,
    onConfirm:(date:any)=>void,
    maximumDate?:any,
    minimumDate?:any,
    format?:string
}

const CommonCalendar = ({value,displayDate,isVisible,onCancel,onConfirm,maximumDate,minimumDate,format}: Props) => {
    return (
        <DatePicker
            value={value}
            mode="date"
            date={displayDate}
            format={format?format:"DD-MM-YYYY"}
            isVisible={isVisible}
            onCancel={() =>onCancel(false)}
            onConfirm={(date) => {
                onConfirm(date);
            }}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
        />
    )
}

export default CommonCalendar;