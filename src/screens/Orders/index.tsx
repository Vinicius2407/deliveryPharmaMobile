import { OrdersList } from "../../components/OrdersList";
import { Wrapper } from "../../components/Wrapper";
import { Title } from "./styles";

export function Orders() {
  return (
    <Wrapper>
      <Title style={{ textAlign: 'center' }}>Meus pedidos</Title>
      <OrdersList />
    </Wrapper>
  );
}