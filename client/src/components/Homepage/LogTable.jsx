import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const LogTable = ({ logData }) => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Timestamp</Th>
                    <Th>Level</Th>
                    <Th>Message</Th>
                </Tr>
            </Thead>
            <Tbody>
                {logData.map((log, index) => (
                    <Tr key={index}>
                        <Td>{log.timestamp}</Td>
                        <Td>{log.level}</Td>
                        <Td>{log.message}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default LogTable;
