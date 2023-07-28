import { showError } from '../../../components/uiCommon/FlashToast';
import axiosInstance from '../helpers/axiosInterceptor';

export const GETMethod = async (url: string) => {
  return await axiosInstance
    .get(url)
    .then(response => {
      if (response.data?.success) {
        const data = response.data?.data;

        return data;
      } else {
        // Toast.show(response.data?.message, Toast.LONG)

        return [];
      }
    })
    .catch(err => {
      // console.log('GETMethod Error===>',url, err);
    });
};

export const POSTMethod = async (url: string, request?: any) => {
  return await axiosInstance
    .post(url, request)
    .then(response => {
      //  console.log('response.data===>', response.data);
      if (response.data.success) {
        //  showSuccess(response.data.message);
        return response.data;
      } else {
        // showError(response.data.message)
        // Toast.show(response.data?.message, Toast.LONG)
        return response.data; 
      }
    })
    .catch(err => {
      // showError(err)
      console.log('POSTMethod Error===>', err);
      showError('Something went wrong')
    });
};
export const POSTMethodMultiPart = async (url: string, request?: any) => {
  return await axiosInstance
    .post(url, request, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      //  console.log('response.data===>', response.data);
      if (response.data.success) {
        //  showSuccess(response.data.message);
        return response.data;
      } else {
        // showError(response.data.message)
        // Toast.show(response.data?.message, Toast.LONG)
        return response.data;
      }
    })
    .catch(err => {
      // showError(err)
      console.log('POSTMethod Error===>', err);
    });
};


export const PUTMethod = async (url: string, request?: any) => {
  return await axiosInstance
    .put(url, request)
    .then(response => {
      //  console.log('response.data===>', response.data);
      if (response.data.success) {
        //  showSuccess(response.data.message);
        return response.data;
      } else {
        // showError(response.data.message)
        // Toast.show(response.data?.message, Toast.LONG)
        return response.data;
      }
    })
    .catch(err => {
      // showError(err)
      console.log('PUTMethod Error===>', err);
    });
};

export const DELMethod = async (url: string) => {
  return await axiosInstance
    .delete(url)
    .then(response => {
      //  console.log('response.data===>', response.data);
      if (response.data.success) {
        //  showSuccess(response.data.message);
        return response.data;
      } else {
        // showError(response.data.message)
        // Toast.show(response.data?.message, Toast.LONG)
        return response.data;
      }
    })
    .catch(err => {
      // showError(err)
      console.log('DELMethod Error===>', err);
    });
};
