import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('Navtun.db')

class dbHandler {
    createTable() {
        //drop existing,create new -- used if schedule is changed
        db.transaction(tx => {
            tx.executeSql(
                'drop table if exists schedule'
            )
            tx.executeSql(
                'create table if not exists schedule (id integer primary key not null, name text, location text, lecturer text, start text, end text, isMuted int, notifDelay int, isCanceled int);'
            )
        })
    }

    insertTable(name, location, lecturer, start, end) {
        db.transaction(tx => {
            tx.executeSql(
                'insert into schedule (name, location, lecturer, start, end, isMuted, notifDelay, isCanceled) values (?, ?, ?, ?, ?, 0, 0, 0)', [name, location, lecturer, start, end]
            )
        })
    }

    changeMuteStatus(id, status) {
        db.transaction(tx => {
            tx.executeSql(
                'update schedule set isMuted = ? where id = ?', [status, id]
            )
        })
    }

    setDelay(id, delay) {
        db.transaction(tx => {
            tx.executeSql(
                'update schedule set notifDelay = ? where id = ?', [delay, id]
            )
        })
    }

    deleteLecture(id) {
        db.transaction(tx => {
            tx.executeSql(
                'delete from schedule where id = ?', [id]
            )
        })
    }

     getCalendar = () => new Promise((resolve,reject) => {
         db.transaction(tx => {
            tx.executeSql(
                'select * from schedule order by datetime(start)', [], (trans, result) => {
                    const calendar = result.rows._array
                    resolve(calendar)
                }
            )
        })
    })
}

export default new dbHandler()