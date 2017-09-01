import React from 'react';

function Tab({ isActive, children }) {
  // return React.cloneElement(React.Children.only(children), { isActive })
  return (
    <div isActive={isActive}>
      {children}
    </div>
  );
}

function TabHeaders({ name, activeIndex, children }) {
  return React.Children.map(
    (children, (child, idx) => React.cloneElement(child, { isActive: idx === activeIndex })),
  );
}

// function Tab

class Tabs extends React.Component {
  state = {
    activeIndex: 0,
  };

  render() {
    const { children } = this.props;
    return React.Children.map(children, child =>
      React.cloneElement(child, { activeIndex: this.state.activeIndex }),
    );
  }
}

export default Tabs;

<Tabs>
  <TabHeaders>
    <Tab>PHOTOS</Tab>
    <Tab>REVIEWS</Tab>
    <Tab>Map</Tab>
  </TabHeaders>
  <TabContent>
    <TabContentCard />
    <TabContentCard />
    <TabContentCard />
  </TabContent>
</Tabs>;
