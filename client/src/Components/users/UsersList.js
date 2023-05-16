import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import { Button, LinearProgress, Pagination } from "@mui/material";
import { useHistory } from "react-router-dom";
import AuthService from "../auth/AuthService";
import Message from "../common/Message";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    padding: "5px"
  },
  tbl: {
    marginTop: "20px"
  },
  addBtn: {
    float: "right",
    cursor: "pointer"
  },
  actionBtn: {
    cursor: "pointer"
  },
  searchBtn: {
    marginLeft: "10px !important",
  },
  loader: {
    marginTop: "5px",
  },
  totalRecords: {
    float: "left"
  }
}));

const Auth = new AuthService();

export default function UsersList(props) {
  const classes = useStyles();
  const history = useHistory();

  const [users, setUsers] = React.useState([]);

  const [loadMessage, setLoadMessage] = React.useState("");
  const [type, setType] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  
  const [limit] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  
  const [searchText, setSearchText] = React.useState("");
  const [totalRecords, setTotalRecords] = React.useState(0);

  // useEffect(() => {
  //   if(Auth.getAdminType() !== 0) 
  //   { 
  //     window.location.hash = "/dashboard";
  //   }
  // }, []);
  
  useEffect(() => {
    
    setLoading(true);
    Auth.fetch(`/users?searchText=${searchText}&page=${page}`)
      .then((res) => {
        if (res.success === true) {
          setUsers(res.users);
          setTotalRecords(res.total_count);
          setTotalPages(Math.ceil(res.total_count / limit));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const Search = () => {
    setLoading(true);
    Auth.fetch(`/users?searchText=${searchText}&page=${page}`)
      .then((res) => {
        if (res.success === true) {
          setUsers(res.users);
          setTotalRecords(res.total_count);
          setTotalPages(Math.ceil(res.total_count / limit));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to want to delete this user?")) {
    const params = {
      method: "DELETE",
    };
    setLoading(true);
    Auth.fetch(`/users/${id}`, params)
      .then((res) => {
        if (res.success) {
          setType("info");
          setLoadMessage(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          setLoading(false);
        } else {
          setLoadMessage("error");
          setLoadMessage(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={classes.root}>
    
    <div>
      <div className={classes.tblTop}>
      <TextField
        placeholder="Search ..."
        label="Search"
        className={classes.searchFld}
        onChange={handleSearch}
        size="small"
      />
      <Button variant="contained" className={classes.searchBtn} onClick={Search}>Search</Button>

      </div>
      {loading && <LinearProgress className={classes.loader} />}
      <AddCircleIcon className={classes.addBtn} onClick={() => {
            history.push("/users/new");
            }}/>
      <TableContainer component={Paper}>
        <Table className={classes.tbl}>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>Id</TableCell>
              <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
              <TableCell style={{fontWeight: "bold"}}>Email</TableCell>
              {/* <TableCell style={{fontWeight: "bold"}}>Phone No.</TableCell>
              <TableCell style={{fontWeight: "bold"}}>Role</TableCell> */}
              <TableCell align="right" style={{fontWeight: "bold"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length ===0 && <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  No records found !
                </TableCell>
            </TableRow>}
            {users.length > 0 && users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                {/* <TableCell>{row.phoneNo}</TableCell>
                <TableCell>{row.role}</TableCell> */}
                <TableCell align="right">
                  <EditIcon className={classes.actionBtn} onClick={() => {
                    history.push("/users/"+row._id);
                    }}/>
                  <DeleteIcon className={classes.actionBtn} onClick={() => {handleDelete(row._id)}} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Message type={type} msg={loadMessage} />
    </div>
    <div className={classes.pagination}>
    {totalRecords > 0 && <p className={classes.totalRecords}> Showing {(page*limit) - limit + 1} to {(page*limit) - limit + users.length} out of {totalRecords} records</p>}
    
        <Pagination
          shape="rounded"
          page={page}
          count={totalPages}
          variant="outlined"
          color="primary"
          onChange={handleChange}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: "10px"
          }}
        />
      </div>
      </div>
    );
}
