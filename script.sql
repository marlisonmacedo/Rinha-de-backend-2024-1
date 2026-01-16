CREATE TABLE IF NOT EXISTS clientes (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    limite BIGINT NOT NULL,
    saldo BIGINT NOT NULL DEFAULT 0,
    version BIGINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS transacoes (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    valor BIGINT NOT NULL,
    tipo CHAR(1) NOT NULL CHECK (tipo IN ('r', 'd')),
    descricao VARCHAR(10) NOT NULL,
    realizada_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE INDEX IF NOT EXISTS idx_transacoes_cliente_id ON transacoes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_realizada_em ON transacoes(realizada_em DESC);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM clientes WHERE id = 1) THEN
    INSERT INTO clientes (id, nome, limite, saldo)
    VALUES
      (1, 'o barato sai caro', 100000, 0),
      (2, 'zan corp ltda', 80000, 0),
      (3, 'les cruders', 1000000, 0),
      (4, 'padaria joia de cocaia', 10000000, 0),
      (5, 'kid mais', 500000, 0);
  END IF;
END; $$;
