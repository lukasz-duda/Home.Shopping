import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, InputNumber, Row, Space, Tree } from "antd";
import { TextField } from "home-shared-ui";
import { ReactNode, useState } from "react";
import { Group } from "./groups-api";
import { polishLocale } from "./locale";
import { Groupping, newId } from "./use-groupping";

const { groups: groupsLocale } = polishLocale;

export const defaultOrdinalNumber = 1;

export interface GroupsProps {
  groupping: Groupping;
}

export function Groups({ groupping }: GroupsProps) {
  const {
    groups,
    addGroup,
    changeGroupName,
    changeGroupOrdinalNumber,
    removeGroup,
    addMatchFragment,
    changeMatchFragmentName,
    changeMatchFragmentPriority,
    changeMatchString,
    removeMatchFragment,
    saveGroups,
    savingGroups,
  } = groupping;

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const [groupName, setGroupName] = useState<null | string>("");

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);

  const selectedGroupMatchFragments =
    selectedGroup &&
    selectedGroup.matchFragments.map((matchFragment) => (
      <Row
        key={matchFragment.id}
        gutter={12}
        justify="start"
      >
        <Col>
          <TextField
            label={groupsLocale.matchFragmentName}
            value={matchFragment.name}
            onChange={(newName: string | null) =>
              changeMatchFragmentName(matchFragment.id, newName)
            }
          />
        </Col>
        <Col>
          <TextField
            label={groupsLocale.matchString}
            value={matchFragment.matchString}
            onChange={(newMatchString: string | null) =>
              changeMatchString(matchFragment.id, newMatchString)
            }
          />
        </Col>
        <Col>
          <Form.Item label={groupsLocale.matchFragmentPriority}>
            <InputNumber
              value={matchFragment.priority}
              onChange={(newPriority) =>
                changeMatchFragmentPriority(matchFragment.id, newPriority)
              }
            />
          </Form.Item>
        </Col>
        <Col>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => removeMatchFragment(matchFragment.id)}
          />
        </Col>
      </Row>
    ));

  const selectedGroupCard = selectedGroup && (
    <Card title={`${groupsLocale.groupPrefix}${selectedGroup.name}`}>
      <Space direction="vertical">
        <Row
          justify="start"
          gutter={12}
        >
          <Col>
            <TextField
              label={groupsLocale.groupName}
              value={findGroupName(selectedGroup.id)}
              onChange={(newName) => changeGroupName(selectedGroup.id, newName)}
            />
          </Col>
          <Col>
            <Form.Item label={groupsLocale.ordinalNumber}>
              <InputNumber
                value={groupOrdinalNumber(selectedGroup.id)}
                onChange={(value) =>
                  changeGroupOrdinalNumber(selectedGroup.id, value)
                }
                precision={0}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => removeGroup(selectedGroup.id)}
            />
          </Col>
        </Row>
        <h4>{groupsLocale.matchFragments}</h4>
        <Button
          type="primary"
          onClick={() => selectedGroup && addMatchFragment(selectedGroup.id)}
        >
          {groupsLocale.addFragment}
        </Button>
        {selectedGroupMatchFragments}
      </Space>
    </Card>
  );

  function findGroupName(groupId: string) {
    return groups.find((group) => group.id === groupId)?.name ?? "";
  }

  function groupOrdinalNumber(groupId: string) {
    return (
      groups.find((group) => group.id === groupId)?.ordinalNumber ??
      defaultOrdinalNumber
    );
  }

  const groupTreeItems: TreeItem[] = groups
    .sort((a, b) => a.ordinalNumber - b.ordinalNumber)
    .map((group) => {
      const treeItem: TreeItem = {
        key: group.id,
        title: `${group.ordinalNumber}. ${group.name}`,
      };
      return treeItem;
    });

  function handleAddGroup() {
    if (groupName) {
      const newGroup: Group = {
        id: newId(),
        name: groupName,
        ordinalNumber: defaultOrdinalNumber,
        matchFragments: [],
      };
      addGroup(newGroup);
      setSelectedGroupId(newGroup.id);
    }
  }

  return (
    <Row gutter={12}>
      <Col xl={8}>
        <Card
          title={groupsLocale.title}
          extra={
            <Button
              onClick={saveGroups}
              disabled={savingGroups}
              loading={savingGroups}
              type="primary"
            >
              {groupsLocale.saveGroups}
            </Button>
          }
        >
          <Space direction="vertical">
            <Form onFinish={handleAddGroup}>
              <TextField
                label={groupsLocale.newGroupName}
                value={groupName}
                onChange={setGroupName}
              />
              <Button
                type="primary"
                htmlType="submit"
              >
                {groupsLocale.addGroup}
              </Button>
            </Form>
            <Tree
              treeData={groupTreeItems}
              onClick={(_, node) => setSelectedGroupId(node.key)}
            />
          </Space>
        </Card>
      </Col>
      <Col xl={16}>{selectedGroupCard}</Col>
    </Row>
  );
}

interface TreeItem {
  key: string;
  title: ReactNode;
  children?: TreeItem[];
}
