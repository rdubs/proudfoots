const React = require('react');

class BillResultSummary extends React.Component {
  render() {
    return (
      <BillResultSummaryPresentational info={this.props.info} legislatorCache={this.props.legislatorCache} />
    );
  }
}

class BillResultSummaryPresentational extends React.Component {
  render() {
    let info = this.props.info;
    let legislatorCache = this.props.legislatorCache;
    let cosponsorElements = [];

    if (info.cosponsor_ids && info.cosponsor_ids.length !== 0) {
      cosponsorElements = info.cosponsor_ids.map(function(id) {
        let cosponsor = legislatorCache[id];
        if (cosponsor === undefined) {
          console.log('+' + id + '+');
          return (
            <span key={id}>{id},</span>
          );
        } else {
          return (
            <span key={id}>{cosponsor.firstname} {cosponsor.lastname} ({cosponsor.party}), </span>
          );
        }
      });
    }

    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-9" style={{padding: 0}}>
                <strong><a href={info.urls.congress + '/text'} target="_blank">{info.short_title}{!info.short_title && info.official_title}</a></strong>
                <small className="text-uppercase"> ({info.chamber})</small>
              </div>
              <div className="col-sm-3" style={{padding: 0}}>
                <span className="pull-right"><small><span className="text-uppercase">{info.bill_id}</span> <strong>introduced - </strong>: {info.introduced_on}</small></span>
              </div>
            </div>
          </div>        
        </div>
        <div className="panel-body">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Sponsor:</strong> {info.sponsor.first_name} {info.sponsor.last_name} ({info.sponsor.party})
                  {info.cosponsor_ids && info.cosponsor_ids.length !== 0 && 
                    <strong> Co-Sponsor(s): </strong> 
                  }
                  {info.cosponsor_ids && info.cosponsor_ids.length !== 0 && 
                    cosponsorElements
                  }
                </td>
              </tr>
              <tr>
                <td>
                  <br />
                  {info.summary_short && 
                    <div>{info.summary_short}</div>
                  }
                  {!info.summary_short &&
                    <div>No Summary Available</div>
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

module.exports = BillResultSummary;