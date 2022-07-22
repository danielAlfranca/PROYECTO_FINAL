
export class InventoryConfig {

    public static readonly keys:any = {

        // MAIN KEYS

        id:{
            private:0, 
            validations:['valid_index'], 
            required:true,
        },
        agent:{

            private:1, 
            validations:['agent_exists'], 
            required:true,
        }, 
        type:{

            private:2, 
            validations:['valid_inventory_type'], 
            required:true,
        },
        data:{

            private:3, 
            validations:['valid_inventory_data'], 
            required:true,
        },
        hidden:{

            private:4, 
            validations:['is_boolean'], 
            required:true,
        }, 
        
    }

    public static validations:{[key:string]:(obj:any, key:string)=>boolean}= {

        valid_inventory_type: (obj:any, key:string) => typeof obj[key] == 'number' && [1,2,3,4,5].includes(obj[key]),
        valid_inventory_data:(obj:any, key:string) => false
    };

    public static getType(obj:any){

        return {

            1:'empresa',
            2:'trabajador',
            3:'hotel',
            4:'tour',
            5:'trabajador'

        }[obj[InventoryConfig.keys.type.private ] as string]
    }

    public static defaultModel(){

        const model = [null,null,null,[],false]

        return [...model]
    }

}