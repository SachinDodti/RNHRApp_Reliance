import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import CarrierInfo from "react-native-carrier-info";
import NetInfo from "@react-native-community/netinfo";
import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network/index";

export default class DeviceRegistrationUtil {

  static async registerDevice(dispatch, otpRequest) {
    let networkName = "N/A";
    try {

      isEmulators = await DeviceInfo.isEmulator()
      
      if(!isEmulators){
        networkName = await CarrierInfo.carrierName();
      }
    
    } catch (er) {
     networkName = "N/A";
    }

    let networkInfoStr = "N/A";
    try {
      const networkInfo = await NetInfo.fetch();
      if (networkInfo.type === "cellular") {
        networkInfoStr = `${networkInfo.details.carrier} ${networkInfo.details.cellularGeneration}`;
      } else {
        networkInfoStr = networkInfo.type;
      }
    } catch (er) {
      networkInfoStr = "N/A";
    }

    let manufacturerStr = "N/A";
    try {

     const  manufacturer =  await DeviceInfo.getManufacturer()
      if(manufacturer){
        manufacturerStr = manufacturer
      }

    
    } catch (er) {
      manufacturerStr = "N/A";
    }

    let totalMemoryStr = "N/A";
    try {

     const getTotalMemory = await DeviceInfo.getTotalMemory()

      if(getTotalMemory){
        totalMemoryStr = getTotalMemory
      }

    } catch (er) {
      totalMemoryStr =" N/A"
    }

    let storageStr = "N/A";
    try {

      storageStr = await DeviceInfo.getFreeDiskStorage()
  
    } catch (er) {
      storageStr = "N/A";
    }

    const registerDeviceRequest = {
      appVersion: DeviceInfo.getVersion().substring(0, 5),
      deviceType: Platform.OS,
      brand: DeviceInfo.getBrand(),
      deviceName: DeviceInfo.getDeviceId(),
      manufacturer: manufacturerStr,
      totalMemory: totalMemoryStr,
      operatingSystem: DeviceInfo.getSystemName(),
      osVersion: DeviceInfo.getSystemVersion(),
      storage: storageStr,
      networkProvider: networkName,
      connectivity: networkInfoStr,
      action: otpRequest.action,
      otp: otpRequest.otp,
    };
    // console.log("Device Needs to be registered : ", registerDeviceRequest);
    return invokeApi(
      dispatch,
      ApiEndpoints.deviceInformation.registerDeviceWithOTP,
      registerDeviceRequest
    );
  }
}
