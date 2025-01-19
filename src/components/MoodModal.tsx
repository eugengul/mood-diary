import { Modal, Pressable, StyleSheet, View } from "react-native";
import { PropsWithChildren } from "react";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants/colors";

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
    width: "100%",
    height: "100%",
    padding: 15,
    borderRadius: 10,
    bottom: 0,
    borderWidth: 2,
    backgroundColor: COLORS.MODAL,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  content: { flexGrow: 1 },
});
