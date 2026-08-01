import { ImagePickerAsset } from "expo-image-picker";
import { api } from "./api";

export async function scanReceipt(image: ImagePickerAsset) {

    if (!image.base64) {
        throw new Error("La imagen no contiene Base64");
    }

    const response = await api.post(
        "/webhook/scan-ticket",
        {
            image: `data:${image.mimeType ?? "image/jpeg"};base64,${image.base64}`,
        }
    );

    return response.data;
}