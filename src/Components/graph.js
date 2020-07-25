import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';
import {dailyConfirmed} from './Api/index';
import axios from 'axios';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            labels: '',
            cdata: ''
         }
    }

    componentDidMount = async() => {
        if(this.props.selectedCountry===''){
        await dailyConfirmed().then(res => {
            let dateArr = []
            let confirmArr = []
            res.data.map(i => {
                dateArr = [...dateArr,i.reportDate]
                confirmArr = [...confirmArr,i.totalConfirmed]
            })

            this.setState({
                labels: dateArr,
                cdata: confirmArr
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    }

    componentDidUpdate = async() => {
        if(this.props.selectedCountry!==''){
            const country = this.props.selectedCountry
            const countryName = country.toLowerCase()
            await axios.get('https://api.covid19api.com/total/dayone/country/'+countryName+'/status/confirmed')
            .then(res => {
                let dateArr = []
                let confirmArr = []

                res.data.map(i => {
                    dateArr = [...dateArr,i.Date]
                    confirmArr = [...confirmArr,i.Cases]
                })
                
                return this.setState({
                    labels: dateArr,
                    cdata: confirmArr
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }


    render() { 
        if(this.props.selectedCountry===''){
            return(
                <div>
                    <Line
                    data={
                        {
                            labels: [...this.state.labels],
                            datasets: [
                            {
                                label: '+ ve',
                                fill: true,
                                lineTension: 0,
                                backgroundColor: '#330546',
                                borderColor: '#fff',
                                borderWidth: 0,
                                data: [...this.state.cdata]
                            }
                            ]
                        }
                    }
                    options={{
                        title:{
                        display:true,
                        text:'World Confirmed Corona Patients',
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                    />
                </div>
            )
        }
        else{
            const country = this.props.selectedCountry
            return(
                <div>
                    <Line
                    data={
                        {
                            labels: [...this.state.labels],
                            datasets: [
                            {
                                label: '+ ve',
                                fill: true,
                                lineTension: 0,
                                backgroundColor: '#330546',
                                borderColor: '#fff',
                                borderWidth: 0,
                                data: [...this.state.cdata]
                            }
                            ]
                        }
                    }
                    options={{
                        title:{
                        display:true,
                        text: country+' Confirmed Cases',
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                    />
                </div>
            )
        }
        
    }
}
 
export default Graph;
