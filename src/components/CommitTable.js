import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CommitTable = ({ commitData, columnDefs }) => {
  return (
    <Box className="ag-theme-alpine" w='600px' h={'200px'}>
      <Text fontSize={'xl'} fontWeight={700} textAlign={'center'} mb={3}> Commit Details</Text>
      <AgGridReact
        rowData={commitData}
        columnDefs={columnDefs}
      />
    </Box>
  );
}

export default CommitTable;
