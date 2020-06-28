import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdEventNote } from 'react-icons/md';
import { FiLogOut, FiUser } from 'react-icons/fi';

import { useAuth } from 'src/hooks/auth';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  // const handleLogOut = useCallback(async () => {
  //   signOut();
  // }, []);

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoFinances" />

        <nav>
          <>
            <Link to="/dashboard">
              <MdEventNote size={20} color="inhehait" />
              Dashboard
            </Link>

            <Link to="/profile">
              <FiUser size={20} />
              Perfil
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
