const Tooltip = ({ children, tooltipId, label }) => {
  return (
    <>
      <div data-tooltip-id={tooltipId} data-tooltip-content={label}>
        {children}
      </div>
      <Tooltip
        id={tooltipId}
        place="bottom"
        style={{
          zIndex: 9999,
          padding: "7px",
          backgroundColor: "#AEAEAE",
          color: "white",
          fontSize: "11px",
        }}
      />
    </>
  );
};

export default Tooltip;
