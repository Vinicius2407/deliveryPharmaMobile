import styled from "styled-components/native";

export const styles = {
  colors: {
    // background: "#f1f3f5",
    background: "#fff",
    contrast: "#ffffff",
    heading: "#2f2f2f",
    body: "#555555",
    border: "#dfdfdf",
    // green: "#399153",
    green: "#28a745",
    red: "#db4040",
    blue: "#1a69bd",
    orange: "#A58132",
    muted: "#6c757d",

    opaques: {
      green: "#39915310",
      blue: "#1a69bd10",
    },
  },
  fonts: {
    regular: "gelion-regular",
    medium: "gelion-medium",
    bold: "gelion-bold",
  },
  sizes: {
    heading: "24px",
    highlight: "18px",
    body: "16px",
    normal: "14px",
    small: "12px",
  },
};

export const Text = styled.Text`
  font-family: ${styles.fonts.medium};
  font-size: ${styles.sizes.body};
  color: ${styles.colors.muted};
`;

export const Highlight = styled.Text`
  font-family: ${styles.fonts.medium};
  color: ${styles.colors.heading};
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.bold};
  color: ${styles.colors.heading};
  font-size: ${styles.sizes.heading};
  text-align: center;
  margin: 8px 0px;
`;

export const Subtitle = styled.Text`
  font-family: ${styles.fonts.regular};
  font-size: ${styles.sizes.highlight};
  color: ${styles.colors.body};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${styles.colors.border};
  margin: 5px 0;
`;

export const VerticalDivider = styled.View`
  width: 1px;
  height: 100%;
  background-color: ${styles.colors.border};
  margin: 5px 0;
`;

export const Box = styled.View`
  width: 100%;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  background: transparent;
`;

export const RowJustifyCenter = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RowJustifyBetween = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Column = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const ColumnJustifyBetween = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const InputContainer = styled.View`
  margin-top: 24px;
`;

