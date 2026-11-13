
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(255) UNIQUE NOT NULL -- Criptografado (LGPD)
);

CREATE TABLE barbeiros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(50) NOT NULL
);

CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DOUBLE PRECISION NOT NULL,
    barbeiro_id INT NOT NULL REFERENCES barbeiros(id) ON DELETE CASCADE
);

CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    data_horario TIMESTAMP NOT NULL,
    cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    servico_id INT NOT NULL REFERENCES servicos(id) ON DELETE CASCADE
);