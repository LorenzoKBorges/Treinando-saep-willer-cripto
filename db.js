import {Pool} from 'pg'

<<<<<<< HEAD

=======
>>>>>>> f40687c7ec76defb30142cb3cf84e37980734249
const pool = new Pool({
    database: 'barbearia',
    port: 5432,
    user: 'postgres',
    host: 'localhost',
    password: 'senai'
})

export default pool