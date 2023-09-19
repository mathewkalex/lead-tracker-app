function transformMenuItems(menuItems) {
    const itemMap = {};
    const rootItems = [];
    menuItems.forEach(item => {
      itemMap[item.id] = { ...item, child: [] };
  
      if (!item.parent) {
        rootItems.push(itemMap[item.id]);
      }
    });
    menuItems.forEach(item => {
      if (item.parent) {
        itemMap[item.parent.id].child.push(itemMap[item.id]);
      }
    });
  
    return rootItems;
  }
  
  // Example input
  const data = [
    {
      name: "Menu3",
      id: "1",
      parent: {
        name: "Menu2",
        id: "2",
        parent: {
          name: "Menu1",
          id: "3",
        },
      },
    },
    {
      name: "Menu44",
      id: "11",
      parent: {
        name: "Menu33",
        id: "22",
        parent: {
          name: "Menu22",
          id: "33",
          parent: {
            name: "Menu11",
            id: "44",
          },
        },
      },
    },
  ];
  
  // Transform the data
  const transformedData = transformMenuItems(data);
  console.log(JSON.stringify(transformedData, null, 2));
  