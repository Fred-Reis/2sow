import React from 'react';
import { Link } from 'react-router-dom';
import { MdEventNote } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { RiUserAddLine } from 'react-icons/ri';

import { useAuth } from 'src/hooks/auth';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <header>
        <img src={Logo} alt="NewWorld" />

        <nav>
          <>
            <Link to="/dashboard">
              <div data-testid="header-testid" />
              <MdEventNote size={20} color="inhehait" />
              Dashboard
            </Link>

            <Link to="/addUser">
              <RiUserAddLine size={20} />
              Adicionar Usuário
            </Link>

            <button type="button" onClick={() => signOut()}>
              <FiLogOut size={20} />
              Sair
            </button>
          </>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
