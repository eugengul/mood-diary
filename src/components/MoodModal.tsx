import { COLORS } from "@/constants/colors";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

interface MoodModalProps extends PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
}

export function MoodModal({ isVisible, onClose, children }: MoodModalProps) {
  return (
    <Modal animationType="slide" visible={isVisible}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Pressable onPress={onClose}>
            <AntDesignIcons name="closecircle" size={44} />
          </Pressable>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: COLORS.MODAL,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  content: { flex: 1 },
});
