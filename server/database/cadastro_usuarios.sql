-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 03-Mar-2023 às 11:32
-- Versão do servidor: 5.7.36
-- versão do PHP: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_supersoft`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cadastro_usuarios`
--

DROP TABLE IF EXISTS `cadastro_usuarios`;
CREATE TABLE IF NOT EXISTS `cadastro_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `data_nascimento` date NOT NULL,
  `local_nascimento` varchar(50) NOT NULL,
  `uf` char(2) NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `estado_civil` varchar(10) DEFAULT NULL,
  `nome_mae` varchar(100) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cadastro_usuarios`
--

INSERT INTO `cadastro_usuarios` (`id_usuario`, `nome`, `cpf`, `data_nascimento`, `local_nascimento`, `uf`, `sexo`, `estado_civil`, `nome_mae`) VALUES
(1, 'Mateus Soares', '14578963214', '2000-01-19', 'Rio Claro', 'SP', 'Masculino', 'Solteiro', 'Márcia'),
(20, 'Thiago de Oliveira', '24796314785', '1980-04-08', 'Florianópolis', 'SC', 'Masculino', 'divorciado', 'Mariana de Oliveira'),
(15, 'Milena Pereira dos Santos', '25486478129', '1995-07-18', 'Limeira', 'SP', 'Feminino', 'casado', 'Regina Pereira dos Santos'),
(17, 'Amanda Costa', '14796325874', '2001-01-08', 'Rio de Janeiro', 'RJ', 'Feminino', 'Casada', 'Regina Costa'),
(18, 'Joaquina Vieira', '14785236546', '1970-07-14', 'Rio Claro', 'SP', 'Feminino', 'Casado', 'Aparecida Vieira'),
(21, 'Pedro Gomes', '75395147852', '2005-09-07', 'Campinas', 'SP', 'Masculino', 'namorando', 'Milena Gomes'),
(22, 'Maria dos Reis', '65478915978', '2000-12-30', 'Belo Horizonte', 'MG', 'Feminino', 'viuvo', 'Camila dos Reis'),
(23, 'Gabriel Oliveira', '25845675398', '1997-08-19', 'João Amaro', 'BA', 'Masculino', 'solteiro', 'Bernardo Oliveira');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
