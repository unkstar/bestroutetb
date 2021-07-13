module.exports = function(Formatter) {

function VyRouteUpFormatter() {
  Formatter.apply(this, arguments);
}
$inherit(VyRouteUpFormatter, Formatter, {
  header: '#!/bin/vbash\nsource /opt/vyatta/etc/functions/script-template\nconfigure\n',
  footer: 'commit\nsave\nexit\n',
  ruleFormat: 'set protocols static interface-route %prefix/%length next-hop-interface %gw\n'
});

function VyRouteDownFormatter() {
  Formatter.apply(this, arguments);
}
$inherit(VyRouteDownFormatter, VyRouteUpFormatter, {
  ruleFormat: 'delete protocols static interface-route %prefix/%length\n'
});

return {
  'up.sh': {
    mode: 0777,
    Formatter: VyRouteUpFormatter
  },
  'down.sh': {
    mode: 0777,
    Formatter: VyRouteDownFormatter
  }
};

};
