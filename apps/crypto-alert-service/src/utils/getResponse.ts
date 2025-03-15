const success = <T>(data?: T) => {
  return {
    resultCode: "SUCCESS",
    data,
  };
};

const error = (errorCode: string, errorData?: object) => {
  return {
    resultCode: "ERROR",
    errorCode,
    errorData,
  };
};

export const getResponse = { success, error };
