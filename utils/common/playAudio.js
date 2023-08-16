import { Audio } from "expo-av";

export async function playAudio(requireAudio = function () {}, shouldPlay = true, index = -1, isLooping = false, isAI = false) {
  try {
    let asset = requireAudio();
    if (asset?.length > 0) {
      asset = index > 0 ? asset[index] : asset[0];
    }
    if (asset && !Array.isArray(asset)) {
      const { sound } = await Audio.Sound.createAsync(asset, { shouldPlay: shouldPlay, isLooping: isLooping });
      if (isAI) sound.setVolumeAsync(0.8);
      return sound;
    }
  } catch (error) {
    //console.log("Error playing audio:", error);
  }
}
