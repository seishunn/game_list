import styled from "styled-components";
import Container from "@/components/Container";

const NavbarItem = styled.div`
  padding: 24px 0;
`

const Input = styled.input`
  border-radius: 24px;
  background: #3B3B3B;
  color: #777777;
  height: 44px;
  font-size: 14px;
  padding: 0 12px 0 38px;
  width: 100%;
  transition: all .2s ease;
  outline: none;

  &:focus, &:hover {
    transition: all .2s ease;
    color: #000000;
    background: #FFFFFF;
  }
`

const Navbar = ({searchQuery = "", setSearchQuery}) => {
    return (
        <NavbarItem>
            <Container>
                <Input
                    type="text"
                    placeholder={"Поиск"}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </Container>
        </NavbarItem>
    )
};

export default Navbar;
