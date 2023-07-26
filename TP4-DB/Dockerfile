# Use a imagem oficial do PostgreSQL como base
FROM postgres:latest

# Variáveis de ambiente para configurar a base de dados e o usuário
ENV POSTGRES_DB empresa
ENV POSTGRES_USER root
ENV POSTGRES_PASSWORD root

# Cópia do arquivo SQL com a criação da tabela
COPY create_table.sql /docker-entrypoint-initdb.d/