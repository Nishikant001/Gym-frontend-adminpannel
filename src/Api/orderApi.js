import axiosInstance from "./axios.js";

/*
|--------------------------------------------------------------------------
| Get all orders - Admin
|--------------------------------------------------------------------------
*/

export const getAllOrders = async () => {
  const { data } = await axiosInstance.get("/orders/my-orders");

  return data;
};


/*
|--------------------------------------------------------------------------
| Update order status
|--------------------------------------------------------------------------
*/

export const updateOrderStatus = async (
  orderId,
  orderStatus
) => {
  const { data } =
    await axiosInstance.put(
      `/orders/${orderId}/status`,
      {
        orderStatus,
      }
    );

  return data;
};


/*
|--------------------------------------------------------------------------
| Get invoice list - Admin
|--------------------------------------------------------------------------
*/

export const getAdminInvoices = async (
 params = {}
) => {
  const { data } =
    await axiosInstance.get(
      "/invoices/admin",
      {
        params,
      }
    );

  return data;
};


/*
|--------------------------------------------------------------------------
| Download invoice
|--------------------------------------------------------------------------
*/

export const downloadInvoice = async (
  invoiceId
) => {
  const response =
    await axiosInstance.get(
      `/invoices/${invoiceId}/download`,
      {
        responseType: "blob",
      }
    );

  return response;
};