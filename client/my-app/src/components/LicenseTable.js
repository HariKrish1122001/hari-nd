import React, { useState, useEffect } from 'react';
import { Table, TableBody,TableCell,TableContainer,TableHead,TableRow,TableSortLabel,Button,Paper, Dialog, DialogActions,DialogContent, DialogTitle,TextField,} from '@mui/material';
import { getLicenses, updateLicense, removeGUID, deleteLicense } from '../api/api';
const LicenseTable = () => {
  const [licenses, setLicenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    licenseID: '',
    expireDate: '',
    associatedGUID: '',
  });
  useEffect(() => {
    fetchLicenses();
  }, []);
  const fetchLicenses = async () => {
    const data = await getLicenses();
    setLicenses(data);
  };
  const handleEdit = (license) => {
    setFormData(license);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = async () => {
    await updateLicense(formData._id, formData);
    setOpen(false);
    fetchLicenses();
  };
  const handleDelete = async (licenseID) => {
    await deleteLicense(licenseID);
    fetchLicenses();
  };
  const handleRemoveGUID = async (id) => {
    console.log(`Removing GUID for ID: ${id}`);
    try {
      await removeGUID(id);
      fetchLicenses();
    } catch (error) {
      console.error("Error removing GUID:", error);
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>License ID</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Expiry Date</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Associated GUID</TableSortLabel>
              </TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licenses.map((row) => (
              <TableRow key={row.licenseID}>
                <TableCell>{row.licenseID}</TableCell>
                <TableCell>{row.expireDate}</TableCell>
                <TableCell>{row.associatedGUID}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit License</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="licenseID"
            label="License ID"
            type="text"
            fullWidth
            value={formData.licenseID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="expireDate"
            label="Expiry Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.expireDate.split('T')[0]}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="associatedGUID"
            label="Associated GUID"
            type="text"
            fullWidth
            value={formData.associatedGUID}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleRemoveGUID(formData._id);
              setFormData((prev) => ({ ...prev, associatedGUID: '' }));
            }}
            style={{ marginTop: '10px' }}
          >
            Remove GUID
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default LicenseTable;