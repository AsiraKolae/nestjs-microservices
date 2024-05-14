// @ts-ignore
import JQL from 'jqljs';

const preprocess = (data : Array<any>) => {
    if (!data[0].length) {
        // non-compacted database
        return data;
    }
// compacted database in hierarchical form of:
    let expanded: any[];
    expanded = [];
    data.forEach((provinceEntry : any) => {
        const province = provinceEntry[0];
        const amphoeList = provinceEntry[1];
        amphoeList.forEach((amphoeEntry : any) => {
            const amphoe = amphoeEntry[0];
            const districtList = amphoeEntry[1];
            districtList.forEach((districtEntry : any) => {
                const district = districtEntry[0];
                const zipCodeList = districtEntry[1];
                zipCodeList.forEach((zipcode : any) => {
                    expanded.push({
                        district: district,
                        amphoe: amphoe,
                        province: province,
                        zipcode: zipcode,
                    });
                });
            });
        });
    });
    return expanded;
};

const collection = new JQL(preprocess(require('./address-db')));

export const resolveResultByField = (type : string, searchStr : string) => {
    let possibles = [];
    try {
        possibles = collection.select('*').where(type)
            .match(`^${searchStr}`)
            .orderBy(type)
            .limit(10)
            .fetch();
    } catch (e) {
        return [];
    }
    return Object.values(possibles);
};
