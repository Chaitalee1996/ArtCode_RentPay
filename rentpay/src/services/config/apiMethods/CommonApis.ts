import axiosInstance from "../helpers/axiosInterceptor";



export const UserInfoGetById = async (url: string) => {
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
      console.log('UserInfoGetById  Error===>', err);
    });
};

export const TenantListById = async (url: string) => {
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
      console.log('UserInfoGetById  Error===>', err);
    });
};


export const PendingRentTenantListCurrentMonthGetById = async (userId: any) => {
  const response = await axiosInstance.get(`/rent_collection/pending-rent/${userId}/UNPAID`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}


export const PaidRentCollection = async (userId: any) => {
  const response = await axiosInstance.get(`/rent_collection/pending-rent/${userId}/UNPAID`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const PropertiesGetAllById = async (userId: any) => {
  const response = await axiosInstance.get(`/property/all/by-user?usersId=${userId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const AssetsGetAll = async () => {
  const response = await axiosInstance.get(`/assets`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const PropertyGetById = async (propertyId: any) => {
  const response = await axiosInstance.get(`/property/${propertyId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const TenantInfoGetByTenantId = async (tenantId: any) => {
  const response = await axiosInstance.get(`/tenants/${tenantId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}


export const TenantQrCodeGenerateByTenantId = async (tenantId: any) => {
  const response = await axiosInstance.get(`/qrcode/generate-qr-code/by-tenant?tenantId=${tenantId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const TenantPoliceReportByTenantId = async (tenantId: any) => {
  const response = await axiosInstance.get(`/police_report/${tenantId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}



export const PropertyTypeListGetByUserId = async (userId: any) => {
  const response = await axiosInstance.get(`/property_type/by-user/${userId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const RoomsAvailableGetByPropertyId = async (propertyId: any) => {
  const response = await axiosInstance.get(`/rooms/property/available/${propertyId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const TenantsGetAllByUserId= async (userId: any) => {
  const response = await axiosInstance.get(`/tenants/by-userId/pageable?pageNo=0&pageSize=50&sortBy=id&sortOrder=DESC&usersId=${userId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const TenantsGetByPropertyId = async (propertyId: any) => {
  const response = await axiosInstance.get(`/tenants/by-property/${propertyId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}
export const TenantDetailsGetByUserIdAndTenantId = async (userId: any,tenantId:any) => {
  const response = await axiosInstance.get(`/assign_property/property/${tenantId}/${userId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const RoomListGetByPropertyId = async (propertyId: any) => {
  const response = await axiosInstance.get(`/assign_property/property/room-list/${propertyId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const CategoriesGetAllById = async (userId:any) => {
  const response = await axiosInstance.get(`/expense_category/users/${userId}`);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const ExpenseGetByPropertyIdAndUserId = async (userId:any,propertyId:any) => {
  const url=`/expense/month-wise/${userId}/${propertyId}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const SubscriptionPlanGetAll = async () => {
  const url=`/subscription`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}
export const SubscriptionPlanGetByUserId = async (userId:any) => {
  const url=`/assign_subscription/subscription-plan/${userId}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const TenantsAvailableListGetByUserId = async (userId:any) => {
  const url=`/tenants/available-tenant-list/${userId}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}
export const TenantsAssignedListGetByUserId = async (userId:any) => {
  const url=`/tenants/assign-tenant-list/${userId}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const DisablePropertiesGetByUserId = async (userId:any) => {
  const url=`/property/disable-property-details/by-user?usersId=${userId}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const TermsAndPoliciesGetAll = async () => {
  const url=`/terms_and_conditions`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const NotificationsGetByUserId = async (userId:any) => {
  const url=`/notification/by-user/${userId}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const RoomsCountGetByUserId = async (userId:any) => {
  const url=`/report/rooms-count/${userId}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const TotalDepositeGetByUserId = async (userId:any) => {
  const url=`/report/total-deposite/${userId}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const GetRoomsListByPropertyIds = async (request:any) => {
  const url=`/rooms/by-property-ids`
  const response = await axiosInstance.post(url,request);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}

export const PaidHistoryGetByTenatIdAndPaidStatus = async (tenantId:any,status:string) => {
  const url=`/rent_collection/paid-history/${tenantId}/${status}`
  const response = await axiosInstance.get(url);
  if (response.data?.success) {
    const data = response.data?.data;
    return data;
  } else {
    return [];
  }
}


export const PropertyStatusUpdateDisable = async (url:string) => {
  
  const response = await axiosInstance.put(url);
  return response.data;
  
}

