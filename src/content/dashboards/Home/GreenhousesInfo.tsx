import React, { useContext, useState, useEffect } from 'react';
import { Box, Card, Grid, Typography, styled, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AuthContext } from 'src/contexts/AuthContext';

import { mergeGreenhousesAndRecords } from 'src/utils/utils';
import { mockGreenhouses, mockRecords } from 'src/mocks/greenhouses.mock';

const GreenCard = styled(Card)(
    ({ theme }) => `
      box-shadow: 0 0 0px 0px ${theme.colors.success.main};
`
);

function createData(
    name: string,
    location: string,
    size: number,
    greenhouse_description: string,
    sensor_records: any[]
) {
    return {
        name,
        location,
        size,
        greenhouse_description,
        sensor_records,
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.size}</TableCell>
                <TableCell align="right">{row.greenhouse_description}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sensor Records
                            </Typography>
                            <Table size="small" aria-label="records">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Timestamp</TableCell>
                                        <TableCell>Temperature</TableCell>
                                        <TableCell>Humidity</TableCell>
                                        <TableCell>Luminosity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.sensor_records.map((record: any) => (
                                        <TableRow key={record.timestamp}>
                                            <TableCell>{record.timestamp}</TableCell>
                                            <TableCell>{record.temperature}</TableCell>
                                            <TableCell>{record.humidity}</TableCell>
                                            <TableCell>{record.luminosity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}



function GreenhousesInfo({ selectedGreenhouse }) {
    const { greenhouses } = useContext(AuthContext);
  
    // If a greenhouse is selected, filter the greenhouses array to include only the selected one
    const filteredGreenhouses = selectedGreenhouse
      ? greenhouses.filter((greenhouse) => greenhouse.name === selectedGreenhouse.name)
      : greenhouses;


    return (
        <GreenCard>
            <Card>
                <Grid>
                    <Box p={4}>
                        <Typography variant="h3" mb={2}>
                            Greenhouses Information.
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Greenhouse Name</TableCell>
                                        <TableCell align="left">Location</TableCell>
                                        <TableCell align="left">Size (sqm)</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredGreenhouses.map((greenhouse) => (
                                        <Row key={greenhouse.name} row={greenhouse} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Card>
        </GreenCard>
    );
}

export default GreenhousesInfo;
