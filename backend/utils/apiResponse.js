class apiResponse {
  constructor(resMessage = "OK", resStatus, resData) {
    this.ressMessage = resMessage;
    this.resStatus = resStatus;
    this.resData = resData;
    this.success = resStatus < 400;
  }
}

export default apiResponse;
