import { Modal } from "@mantine/core";
import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea } from '@mantine/core';
import {
    IconPencil,
    IconMessages,
    IconNote,
    IconReportAnalytics,
    IconTrash,
    IconDots,
} from '@tabler/icons-react';

const DisplayResults = ({ opened, handleClose, finalStats }) => {


    finalStats = finalStats.sort((a, b) => {
        return b.stats.netWPM - a.stats.netWPM;
    });


    const rows = finalStats.map((item, index) => (
        <tr key={index}>
            <td>
                <Group spacing="sm">
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.username}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {index + 1}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Text fz="sm">{item.stats.grossWPM}</Text>
                <Text fz="xs" c="dimmed">
                    Gross WPM
                </Text>
            </td>
            <td>
                <Text fz="sm" >{item.stats.netWPM}</Text>
                <Text fz="xs" c="dimmed">
                    Net WPM
                </Text>
            </td>
            <td>
                <Text fz="sm">{item.stats.accuracy + '%'}</Text>
                <Text fz="xs" c="dimmed">
                    Accuracy
                </Text>
            </td>
            {/* <td>
                <Text fz="sm">${index} / hr</Text>
                <Text fz="xs" c="dimmed">
                    Rank
                </Text>
            </td> */}
        </tr>
    ));

    return (
        <>
            <Modal opened={opened} onClose={handleClose} title="Results" centered size={'50%'}>
                <ScrollArea>
                    <Table sx={{ minWidth: 500 }} verticalSpacing="md">
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Modal>
        </>
    );
}

export default DisplayResults;